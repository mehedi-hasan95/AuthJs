import { auth, signOut } from "@/auth";

const DashboardPage = async () => {
  const session = await auth();
  return (
    <div className="commonCss">
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button>Sign Out</button>
      </form>
    </div>
  );
};

export default DashboardPage;
