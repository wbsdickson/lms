import { UserButton } from "@clerk/nextjs";

const Page = () => {
    return (
        <>
            <UserButton afterSignOutUrl="/"></UserButton>
        </>
    );
};

export default Page;
