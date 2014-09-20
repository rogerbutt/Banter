function similarity(speechText, slideJson)
{
	var avgScore = slideJson.results[0];
	var numChecks = slideJson.results[1];
	var slideText = slideJson.content;
	slideText.replace("\<.*?\>", "");

	var lastBack = speechText.lastIndexOf("back");
	var lastNext = speechText.lastIndexOf("next");
	if(lastNext > lastBack)
		var lastIndex = lastNext;
	else
		var lastIndex = lastBack;

	speechText = speechText.substring(lastIndex + 3);
	var speechLength = speechText.length;
	if(speechLength == 0)
		return [0,0];
	
	var slideTextLength = slideText.length;
	var diffLength = slideTextLength - speechLength;
	if(diffLength < 0)
		diffLength = 0;

	var leven = new Levenshtein(slideText, speechText);
	var score = (1 - ((leven - diffLength)/speechLength);
	avgScore = (avgScore + score)/(numChecks + 1);
	return [avgScore, (numChecks + 1)];
}