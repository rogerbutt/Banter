function similarity(speechText, slideJson, avgScore, numChecks)
{
	var slideText = slideJson.content;
	slideText.replace("\<.*?\>", "");

	var speechLength = speechText.length;
	var slideTextLength = slideText.length;
	var diffLength = slideTextLength - speechLength;
	if(diffLength < 0)
		diffLength = 0;

	var leven = new Levenshtein(slideText, speechText);
	var score = (1 - ((leven - diffLength)/speechLength);
	avgScore = (avgScore + score)/numChecks;
	return avgScore;
}