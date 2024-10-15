import { PdfProps } from "../types";

export default function PdfTagIFrame(props: PdfProps) {
  const { src, height = 600 } = props;
  return (
    <iframe src={src} width="100%" height={height} allowFullScreen></iframe>
  );
}
