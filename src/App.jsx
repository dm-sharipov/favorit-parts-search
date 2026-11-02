import { BrandList } from "./components/BrandList";
import { OffersTable } from "./components/OffersTable";
import { SearchForm } from "./components/SearchForm";

export function App() {
	return (
		<main className="page__main container">
			<h1 className="page__title">Подбор автозапчастей</h1>

			<SearchForm />

			<BrandList />

			<OffersTable />
		</main>
	);
}
