
/*
 *	This file contains the javascript code for the animal gallery
 */

// variables for all of the templates so we only have to compile
// them once on page load and can then use the same compiled 
// templates many times
var albums_template, photos_template, photo_template, slideshow_template;

// variables to store the current displayed album and photo
var current_album = animals_data.category[0];
var current_photo = current_album.animals[0];

// a helper function that instantiates a template
// and displays the results in the content div
function showTemplate(template, data){
	var html = template(data);
	$('#content').html(html);
}

$(document).ready(function(){

	// compile all of the templates ready for use
	var source   = $("#albums-template").html();
	albums_template = Handlebars.compile(source);
	
	source   = $("#photos-template").html();
	photos_template = Handlebars.compile(source);
	
	source   = $("#photo-template").html();
	photo_template = Handlebars.compile(source);
	
	source   = $("#slideshow-template").html();
	slideshow_template = Handlebars.compile(source);
	
	//albums-tab click function
	$(".albums-tab").click(function () {

		// displays the albums template
		showTemplate(albums_template, animals_data);

		// make the albums tab the active one
		// first make the currently active tab inactive
		$(".nav-tabs .active").removeClass("active");
		// then make albums tab active
		$(".albums-tab").addClass("active");
		//hide slideshow tab when not inside specific album
		$(".slideshow-tab").addClass("hidden");
		//hide other breadcrumbs except "Albums"
		$("#photos-bc").addClass("hidden");
		$("#photo-bc").addClass("hidden");

		// add a click callback to each album image
		$(".album-thumbnail").click(function (){
			$(".nav-tabs .active").removeClass("active");
			// then make albums tab active
			$(".albums-tab").addClass("active");
			//show slideshow tab when inside specific album	
			$(".slideshow-tab").removeClass("hidden");
			//show breadcrumb "Album Photos"
			$("#photos-bc").removeClass("hidden");
	
			// get the index (position in the array)
			// of the album user clicked on
			// "this" is the element that was clicked on
			// data("id") gets the attribute data-id
			// (which we set to the index of the album in
			// the array - @index)
			var index = $(this).data("id");

			// set the current album to this album
			current_album = animals_data.category[index];

			// displays the photos template
			showTemplate(photos_template, current_album);
			
			// add an on click for all the image thumbnails
			// which displays a bigger version of the images
			$(".photo-thumbnail").click(function (){
				// get the index (position in the array)
				// of the photo we clicked on
				// "this" is the element that was clicked on
				// data("id") gets the attribute data-id
				// (which we set to the index of the photo in
				// the array - @index)
				var index = $(this).data("id");

				// set the current photo to this photo
				current_photo = current_album.animals[index];
				
				// displays the single photo template
				showTemplate(photo_template, current_photo);

				//set beadcrumb & its name
				$("#photo-bc").removeClass("hidden");
				$("#photo-bc").text(current_photo.name);
			});
		});
	});

	//  clicking on the slideshow tab displays the
	//  current album as a slide show
	$(".slideshow-tab").click(function () {
		// display the slideshow template using the 
		// current album
		showTemplate(slideshow_template, current_album);
		
		// make the slideshow tab the active one
		// first make the currently active tab inactive
		$(".nav-tabs .active").removeClass("active");
		// then make slideshow tab active
		$(".slideshow-tab").addClass("active");
		//show appropriate breadcrumb
		$("#photo-bc").removeClass("hidden");
		$("#photo-bc").text("Slideshow");
	});

	//  clicking on the photos tab shows all of the 
	//  photos in the current album
	$(".photos-tab").click(function () {
		// displays the photos template
		showTemplate(photos_template, current_album);
		$(".nav-tabs .active").removeClass("active");
		// then make albums tab active
		$(".albums-tab").addClass("active");
		$("#photo-bc").addClass("hidden");
		$(".photo-thumbnail").click(function (){
			// get the index (position in the array)
			// of the photo we clicked on
			// "this" is the element that was clicked on
			// data("id") gets the attribute data-id
			// (which we set to the index of the photo in
			// the array - @index)
			var index = $(this).data("id");

			// set the current photo to this photo
			current_photo = current_album.animals[index];
			
			// displays the single photo template
			showTemplate(photo_template, current_photo);

			//set beadcrumb % its name
			$("#photo-bc").removeClass("hidden");
			$("#photo-bc").text(current_photo.name);
		});
	});

	// start the page by showing the albums view
	// we do this by virtually clicking on the 
	// albums tab
	$(".albums-tab").click();
});