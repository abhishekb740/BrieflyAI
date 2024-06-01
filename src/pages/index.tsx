export default function Home() {
  return <></>;
}

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: `/home`,
      permanent: false,
    },
  };
};
