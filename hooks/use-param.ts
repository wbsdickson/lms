import { useRouter } from "next/router";

const useParam = () => {
    const router = useRouter();
    const query = router.query;
    return { query };
};

export default useParam;
