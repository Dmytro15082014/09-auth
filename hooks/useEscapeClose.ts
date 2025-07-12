import { useEffect } from "react";

export default function useEscapeClose(
  onClose?: () => void,
  backDropId?: string
) {
  useEffect(() => {
    if (!onClose) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") onClose();
    };
    // const handleBackdropClose = (e: MouseEvent) => {
    //   const target = e.target as HTMLDivElement;
    //   console.log(target);

    //   if (target.id !== backDropId) onClose();
    // };

    // document.addEventListener("mousedown", handleBackdropClose);
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      // document.removeEventListener("mousedown", handleBackdropClose);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = " ";
    };
  }, [onClose, backDropId]);
}
