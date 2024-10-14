export default function AddCodePage({
  params,
}: {
  params: { environmentId: string };
}) {
  return <div>Add Code Page {params.environmentId}</div>;
}
