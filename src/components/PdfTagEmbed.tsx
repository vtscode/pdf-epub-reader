import { PdfProps } from "../types";

export default function PdfTagEmbed(props: PdfProps) {
  const { src, height } = props;
  return (
    <embed
      src={src}
      width="100%"
      height={height ?? 600}
      type="application/pdf"
    />
  );
}
