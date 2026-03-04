
function SentimentBox({ sentiment }) {
  return (
    <div>
      <h3>Audience Sentiment</h3>
      <p><strong>{sentiment.classification}</strong></p>
      <p>{sentiment.summary}</p>
    </div>
  );
}

export default SentimentBox;