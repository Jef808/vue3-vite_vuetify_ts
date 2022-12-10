/**
 * Sleep for 2.5 seconds then return toy data.
 */
export default async function(): Promise<{
    labels: string[];
    datasets: { data: number[]; label?: string; backgroundColor?: string }[];
}> {
    await sleep(2500);
    return {
        labels: ["January", "February", "March"],
        datasets: [
            {
                label: "Data One",
                data: [40, 20, 12],
                backgroundColor: "#f87979",
            },
        ],
    };
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
