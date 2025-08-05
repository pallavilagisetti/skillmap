export default function Summary() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">4. Summary</h2>

      <div className="space-y-2">
        <p><strong>Name:</strong> Jane Doe (to be extracted via OpenAI)</p>
        <p><strong>Total Experience:</strong> 5 years</p>

        <p><strong>Top Skills:</strong> React, Node.js, Git</p>
        <p><strong>Matched Skills:</strong> React, Git</p>
        <p><strong>Missing Skills:</strong> Node.js, REST API, CSS</p>

        <p className="mt-4 text-blue-600">
          Suggested next steps: Learn Node.js and REST APIs to qualify for this job.
        </p>
      </div>
    </div>
  );
}
