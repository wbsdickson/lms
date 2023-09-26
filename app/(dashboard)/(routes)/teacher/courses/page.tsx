import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

// import { db } from "@/lib/db";

// import { DataTable } from "./_components/data-table";
// import { columns } from "./_components/columns";

const CoursesPage = async () => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    // const courses = await db.course.findMany({
    //   where: {
    //     userId,
    //   },
    //   orderBy: {
    //     createdAt: "desc",
    //   },
    // });

    return (
        <div className="p-6">
            {/* <DataTable columns={columns} data={courses} /> */}
            <Link href="/teacher/create">
                <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New course
                </Button>
            </Link>
        </div>
    );
};

export default CoursesPage;
