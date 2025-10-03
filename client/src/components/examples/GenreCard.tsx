import GenreCard from '../GenreCard';

export default function GenreCardExample() {
  const sampleGenre = {
    id: '1',
    name: 'پاپ',
  };

  return (
    <div className="p-8">
      <div className="max-w-xs">
        <GenreCard genre={sampleGenre} />
      </div>
    </div>
  );
}
