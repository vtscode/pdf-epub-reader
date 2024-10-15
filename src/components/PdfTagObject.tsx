import { PdfProps } from "../types";

export default function PdfTagObject(props: PdfProps) {
  return (
    <>
      <object
        data={props.src}
        type="application/pdf"
        width="100%"
        height={props.height ?? 600}
      ></object>
    </>
  );
}
