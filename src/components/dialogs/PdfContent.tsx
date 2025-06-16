import { useState } from "react";
import { Download, ZoomIn, ZoomOut } from "lucide-react";

interface PdfContentProps {
  title: string;
  pdfUrl?: string;
}

export default function PdfContent({ title, pdfUrl }: PdfContentProps) {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = title;
      link.click();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* PDF Controls */}
      <div className="flex items-center justify-end gap-2 p-3 bg-gray-50 border-b border-gray-200 flex-shrink-0">
        <button
          onClick={handleZoomOut}
          className="p-2 hover:bg-gray-100 rounded"
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </button>
        <span className="text-sm text-gray-600 min-w-[60px] text-center">
          {zoom}%
        </span>
        <button
          onClick={handleZoomIn}
          className="p-2 hover:bg-gray-100 rounded"
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-2" />
        
        <button
          onClick={handleDownload}
          className="p-2 hover:bg-gray-100 rounded"
          title="Download PDF"
        >
          <Download size={16} />
        </button>
      </div>

      {/* PDF Content */}
      <div className="flex-1 p-4 overflow-auto bg-gray-50">
        {pdfUrl ? (
          <div className="h-full flex justify-center">
            <iframe
              src={`${pdfUrl}#zoom=${zoom}`}
              className="w-full h-full border border-gray-300 rounded"
              title={title}
            />
          </div>
        ) : (
          /* Placeholder content for demo */
          <div className="h-full bg-white border border-gray-300 rounded p-8 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-6 text-center">Dynamic Programming</h1>
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Dynamic Programming is an algorithmic paradigm that solves complex problems by breaking them down into simpler subproblems. 
                It is applicable to problems exhibiting the properties of overlapping subproblems and optimal substructure.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4">Key Concepts</h2>
              <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
                <li><strong>Overlapping Subproblems:</strong> The problem can be broken down into subproblems which are reused several times.</li>
                <li><strong>Optimal Substructure:</strong> An optimal solution can be constructed from optimal solutions of its subproblems.</li>
                <li><strong>Memoization:</strong> Storing the results of expensive function calls and returning the cached result.</li>
                <li><strong>Tabulation:</strong> Building up a table of solutions to subproblems in a bottom-up manner.</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">Common Examples</h2>
              
              <h3 className="text-xl font-medium mb-3">1. Fibonacci Sequence</h3>
              <div className="bg-gray-100 p-4 rounded mb-4">
                <pre className="text-sm">
{`function fibonacci(n) {
  if (n <= 1) return n;
  
  let dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  
  return dp[n];
}`}
                </pre>
              </div>

              <h3 className="text-xl font-medium mb-3">2. Knapsack Problem</h3>
              <p className="mb-4 text-gray-700">
                Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value.
              </p>

              <h3 className="text-xl font-medium mb-3">3. Longest Common Subsequence</h3>
              <p className="mb-4 text-gray-700">
                Find the longest subsequence common to all sequences.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Time Complexity</h2>
              <p className="mb-4 text-gray-700">
                Dynamic programming typically reduces exponential time complexity to polynomial time by storing intermediate results.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <p className="text-blue-800">
                  <strong>Remember:</strong> The key to dynamic programming is to identify the recurrence relation and the base cases.
                </p>
              </div>

              <h2 className="text-2xl font-semibold mb-4">Practice Problems</h2>
              <ol className="list-decimal list-inside text-gray-700 space-y-1">
                <li>House Robber</li>
                <li>Coin Change</li>
                <li>Edit Distance</li>
                <li>Maximum Subarray</li>
                <li>Climbing Stairs</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
