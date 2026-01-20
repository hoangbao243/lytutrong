import { Suspense } from "react";
import SearchingClient from "./SearchingClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Đang tìm kiếm...</div>}>
      <SearchingClient />
    </Suspense>
  );
}