import { toPng } from "html-to-image";

export type ExportResult = "shared" | "downloaded" | "cancelled" | "error";

/** Reject a promise if it doesn't settle in time, so the UI can't hang forever. */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => reject(new Error("render timed out")), ms);
    promise.then(
      (v) => {
        clearTimeout(id);
        resolve(v);
      },
      (e) => {
        clearTimeout(id);
        reject(e);
      },
    );
  });
}

async function nodeToPngBlob(node: HTMLElement): Promise<Blob> {
  // skipFonts: the card uses only system fonts, and html-to-image's web-font
  // embedding otherwise scans/fetches stylesheets and can stall.
  const dataUrl = await withTimeout(
    toPng(node, {
      pixelRatio: 2,
      backgroundColor: "#0b1020",
      skipFonts: true,
    }),
    12000,
  );
  const res = await fetch(dataUrl);
  return res.blob();
}

/**
 * Render the card node to a PNG and hand it to the OS share sheet when files
 * are supported; otherwise fall back to a download. Never throws to the UI —
 * returns a result the caller can turn into a status message.
 */
export async function shareOrDownloadCard(
  node: HTMLElement,
  filename: string,
  share: { title: string; text: string },
): Promise<ExportResult> {
  let blob: Blob;
  try {
    blob = await nodeToPngBlob(node);
  } catch {
    return "error";
  }

  const file = new File([blob], filename, { type: "image/png" });
  const shareData: ShareData = {
    files: [file],
    title: share.title,
    text: share.text,
  };

  if (
    typeof navigator.canShare === "function" &&
    navigator.canShare(shareData) &&
    typeof navigator.share === "function"
  ) {
    try {
      await navigator.share(shareData);
      return "shared";
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return "cancelled";
      // otherwise fall through to download
    }
  }

  try {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    return "downloaded";
  } catch {
    return "error";
  }
}
