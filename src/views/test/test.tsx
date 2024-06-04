// eslint-disable-next-line @typescript-eslint/no-explicit-any
let data: any = null;
const SystemMenuPage: React.FC = () => {
  if (!data) {
    throw new Promise((resolve) => {
      setTimeout(() => {
        data = 'kunkun';
        resolve(true);
      }, 6000000);
    });
  }
  return (
    <p>
      My Component, data is {data}
    </p>
  );
}
export default SystemMenuPage;