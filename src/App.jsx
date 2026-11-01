import { BrandList } from "./components/BrandList";
import { OffersTable } from "./components/OffersTable";
import { SearchForm } from "./components/SearchForm";

export function App() {
	return (
		<main className="container app py-5">
			<h1 className="h3 mb-4">Подбор автозапчастей</h1>

			<SearchForm />

			<BrandList />

			<OffersTable />
		</main>
	);
}
