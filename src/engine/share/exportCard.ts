import { toSvg } from "html-to-image";

export type ExportResult = "shared" | "downloaded" | "cancelled" | "error";

const CARD_BG = "#201b14"; // fills the rounded-corner gaps behind the card (ink)
const SCALE = 2; // crisp on high-DPI phones

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

/**
 * Rasterize an SVG data URL to a PNG blob via `img.onload` + canvas. We drive
 * the raster step ourselves (rather than html-to-image's `toPng`) because its
 * internal `img.decode()` is a known flaky/stall point on some browsers; the
 * `onload` path is broadly reliable.
 */
function rasterizeSvg(
  svgDataUrl: string,
  width: number,
  height: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(width * SCALE);
        canvas.height = Math.round(height * SCALE);
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("2d canvas context unavailable"));
          return;
        }
        ctx.fillStyle = CARD_BG;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.scale(SCALE, SCALE);
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) =>
            blob ? resolve(blob) : reject(new Error("canvas.toBlob was null")),
          "image/png",
        );
      } catch (e) {
        reject(e instanceof Error ? e : new Error(String(e)));
      }
    };
    img.onerror = () => reject(new Error("card SVG failed to load"));
    img.src = svgDataUrl;
  });
}

async function nodeToPngBlob(node: HTMLElement): Promise<Blob> {
  // Embed web fonts (only latin subsets are referenced) so the exported card
  // keeps its Fraunces/Space Grotesk type rather than falling back to system.
  const svgDataUrl = await withTimeout(
    toSvg(node, { backgroundColor: CARD_BG }),
    12000,
  );
  return withTimeout(
    rasterizeSvg(svgDataUrl, node.offsetWidth, node.offsetHeight),
    8000,
  );
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
