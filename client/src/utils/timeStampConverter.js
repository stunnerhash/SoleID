import React from "react";

export const dateConverter = (timeStamp)=>{
  var a = new Date(parseInt(timeStamp));
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var fullDate = date + ' ' + month + ' ' + year;
  return fullDate;
}

export const timeConverter= (timeStamp) =>{
	var a = new Date(parseInt(timeStamp));
	var hour = (a.getHours()%12 || 12).toString().padStart(2,'0');
	var min = (a.getMinutes()).toString().padStart(2,'0');
	var sec = (a.getSeconds()).toString().padStart(2,'0');
	var ampm = a.getHours() >= 12 ? 'PM' : 'AM'; 
	var time = hour + ':' + min + ':' + sec + ' ' +ampm;
 	return time;
}

