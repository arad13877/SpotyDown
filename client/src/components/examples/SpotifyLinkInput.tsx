import SpotifyLinkInput from '../SpotifyLinkInput';

export default function SpotifyLinkInputExample() {
  return (
    <div className="p-8">
      <SpotifyLinkInput 
        onSubmit={(url, trackId) => console.log('URL:', url, 'Track ID:', trackId)} 
      />
    </div>
  );
}
