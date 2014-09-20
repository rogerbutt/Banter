function similarity(speechText, slideJson, currSlide)
{
	var slides = slideJson.slides;
	var slideText = slides[currSlide].content;
	slideText.replace("\<.*?\>", "");

	var speechLength = speechText.length;
	var slideTextLength = slideText.length;
	var diffLength = slideTextLength - speechLength;
	if(diffLength < 0)
		diffLength = 0;

	var leven = new Levenshtein(slideText, speechText);
	var score = (1 - ((leven - diffLength)/speechLength);
	return score;
}