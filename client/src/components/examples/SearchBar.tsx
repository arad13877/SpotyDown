import SearchBar from '../SearchBar';

export default function SearchBarExample() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">نوار جستجوی Hero</h3>
        <SearchBar variant="hero" onSearch={(q) => console.log('جستجو:', q)} />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">نوار جستجوی فشرده</h3>
        <SearchBar variant="compact" onSearch={(q) => console.log('جستجو:', q)} />
      </div>
    </div>
  );
}
