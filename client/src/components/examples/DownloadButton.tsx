import DownloadButton from '../DownloadButton';

export default function DownloadButtonExample() {
  return (
    <div className="p-8 space-y-4 max-w-md">
      <div>
        <h3 className="text-sm font-semibold mb-2">حالت عادی</h3>
        <DownloadButton onDownload={(quality) => console.log('دانلود:', quality)} />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">در حال دانلود</h3>
        <DownloadButton onDownload={(quality) => console.log('دانلود:', quality)} isDownloading />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">غیرفعال</h3>
        <DownloadButton onDownload={(quality) => console.log('دانلود:', quality)} disabled />
      </div>
    </div>
  );
}
