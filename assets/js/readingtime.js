/*!

Name: Reading Time
Dependencies: jQuery
Author: Michael Lynch
Author URL: http://michaelynch.com
Date Created: August 14, 2013
Date Updated: June 10, 2014
Licensed under the MIT license

*/

(function($) {

    $.fn.readingTime = function(options) {
    
    	//return if no element was bound
		//so chained events can continue
		if(!this.length) { 
			return this; 
		}

		//define default parameters
        var defaults = {
	        readingTimeTarget: '.eta',
	        wordCountTarget: null,
	        wordsPerMinute: 270,
	        round: true,
	        lang: 'en',
			lessThanAMinuteString: '',
			prependTimeString: '',
			prependWordString: '',
			appendTimeString: '',
	        remotePath: null,
	        remoteTarget: null
        }
        
        //define plugin
        var plugin = this;

        //define element
        var el = $(this);

        //merge defaults and options
        plugin.settings = $.extend({}, defaults, options);
        
        //define vars
        var readingTimeTarget = plugin.settings.readingTimeTarget;
        var wordCountTarget = plugin.settings.wordCountTarget;
        var wordsPerMinute = plugin.settings.wordsPerMinute;
        var round = plugin.settings.round;
        var lang = plugin.settings.lang;
		var lessThanAMinuteString = plugin.settings.lessThanAMinuteString;
		var prependTimeString = plugin.settings.prependTimeString;
		var prependWordString = plugin.settings.prependWordString;
		var appendTimeString = plugin.settings.appendTimeString;
        var remotePath = plugin.settings.remotePath;
        var remoteTarget = plugin.settings.remoteTarget;
        
        
        //if lang is set to italian
        if(lang == 'it') {
			
        	var lessThanAMinute = lessThanAMinuteString || "Meno di un minuto";
        	
        	var minShortForm = 'min';
	     
        //if lang is set to french
        } else if(lang == 'fr') {
			
        	var lessThanAMinute = lessThanAMinuteString || "Moins d'une minute";
        	
        	var minShortForm = 'min';
	     
	    //if lang is set to german  
        } else if(lang == 'de') {
        
	        var lessThanAMinute = lessThanAMinuteString || "Weniger als eine Minute";
	        
	        var minShortForm = 'min';

        //if lang is set to spanish
        } else if(lang == 'es') {
	        
	        var lessThanAMinute = lessThanAMinuteString || "Menos de un minuto";
	        
	        var minShortForm = 'min';
	        
        //if lang is set to dutch
        } else if(lang == 'nl') {
	        
	        var lessThanAMinute = lessThanAMinuteString || "Minder dan een minuut";
	        
	        var minShortForm = 'min';
	
	//if lang is set to slovak
        } else if(lang == 'sk') {
	        
	        var lessThanAMinute = lessThanAMinuteString || "Menej než minútu";
	        
	        var minShortForm = 'min';
	
	//if lang is set to czech
        } else if(lang == 'cz') {
	        
	        var lessThanAMinute = lessThanAMinuteString || "Méně než minutu";
	        
	        var minShortForm = 'min';
	
	    //default lang is english
        } else {
	        
	        var lessThanAMinute = lessThanAMinuteString || 'Less than a minute';
	        
	        var minShortForm = 'min';
	        
        }
        
        var setTime = function(text) {

	        //split text by spaces to define total words
			var totalWords = text.trim().split(/\s+/g).length;
			
			//define words per second based on words per minute (wordsPerMinute)
			var wordsPerSecond = wordsPerMinute / 60;
			
			//define total reading time in seconds
			var totalReadingTimeSeconds = totalWords / wordsPerSecond;
			
			//define reading time in minutes
			//if round is set to true
			if(round === true) {

				var readingTimeMinutes = Math.round(totalReadingTimeSeconds / 60);

			//if round is set to false
			} else {

				var readingTimeMinutes = Math.floor(totalReadingTimeSeconds / 60);

			}

			//define remaining reading time seconds
			var readingTimeSeconds = Math.round(totalReadingTimeSeconds - readingTimeMinutes * 60);
			
			//if round is set to true
			if(round === true) {
				
				//if minutes are greater than 0
				if(readingTimeMinutes > 0) {
			
					//set reading time by the minute
					$(readingTimeTarget).text(prependTimeString + readingTimeMinutes + ' ' + minShortForm + ' ' + appendTimeString);
				
				} else {
					
					//set reading time as less than a minute
					$(readingTimeTarget).text(prependTimeString + lessThanAMinute + ' ' + appendTimeString);
					
				}
			
			//if round is set to false	
			} else {
			
				//format reading time
				var readingTime = readingTimeMinutes + ':' + readingTimeSeconds;
				
				//set reading time in minutes and seconds
				$(readingTimeTarget).text(prependTimeString + readingTime);
				
			}
	
			//if word count container isn't blank or undefined
			if(wordCountTarget !== '' && wordCountTarget !== undefined) {
			
				//set word count
				$(wordCountTarget).text(prependWordString + totalWords);
			
			}
		
		};
		
		//for each element
		el.each(function() {
        
	        //if remotePath and remoteTarget aren't null
	        if(remotePath != null && remoteTarget != null) {

	        	//get contents of remote file
	    		$.get(remotePath, function(data) {
					
					//set time using the remote target found in the remote file
					setTime($('<div>').html(data).find(remoteTarget).text());
					
				});
		        
	        } else {
	
		        //set time using the targeted element
		        setTime(el.text());
	        
	        }
        
        });
        
    }

})(jQuery);