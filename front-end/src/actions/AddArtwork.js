import $ from 'jquery';

export default function(artData) {
    var formData = new FormData();
    formData.append('title', artData.title);
    formData.append('imgFile', artData.imgFile);
    formData.append('description', artData.description);
    formData.append('startPrice', artData.startPrice);
    formData.append('buyNow', artData.buyNow);
    formData.append('auctionStart', artData.auctionStart);
    formData.append('auctionEnd', artData.auctionEnd);
    formData.append('id', artData.id)
    formData.append('tags', artData.tags)
    console.log(formData)
	var thePromise = $.ajax({
		method: "POST",
		url: "http://localhost:3000/addArtwork",
        processData: false,
        dataType: 'json',
        cache: false,
        data: formData,
        contentType: false
	});
	return{
		type: "ADD_ARTWORK",
		payload: thePromise
	}
}
