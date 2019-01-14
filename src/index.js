const reloadController=(function(){
	var dbxconfig=require('./dbxconfig');
	return{

  	getDisplaydata:function(){
    const returngetdisplaydata=dbxconfig.dbx.filesListFolder({path:'/senphotogallery'})
    return returngetdisplaydata;
	},

	getThumbnaildata:function(){
		const data=dbxconfig.dbx;
		return data;
	},
	deleteimage:function(image_name){
		 dbxconfig.dbx.filesDelete({path:`/senphotogallery/${image_name}`})
		 .then(function(response){
		 	return response;
		 })
		 .catch(function(error){
		 	console.log(error)
		 })
	}

  }

})();

const app=(function(ReloadCtrl){
	let output='';

function EventFunction(){
	document.addEventListener('DOMContentLoaded', displayData);
	document.getElementById('fileupload').addEventListener('click', uploadContent);
}
const uploadContent=function(){
console.log('Hi there');
}
const displayData=function(){
	ReloadCtrl.getDisplaydata()
	.then(function(response){
		response.entries.forEach(function(item){
			ReloadCtrl.getThumbnaildata().filesGetThumbnail({path: `/senphotogallery/${item.name}`})
						.then(function(responsedata){
						const parentNode=document.querySelector('.getdata');
            			var div=document.createElement('div');
            			div.className="col-lg-3 col-md-4 col-xs-6 thumb";
            			const img=document.createElement('img');
            			img.src=window.URL.createObjectURL(responsedata.fileBlob);
						img.className='img-thumbnail'; 
						const Button=document.createElement('button');
						Button.className="btn";
						Button.onclick=function(){
						deleteData(`${item.name}`);
						}
						Button.appendChild(document.createTextNode('Delete'));
						div.appendChild(Button);
						div.appendChild(img);
            			parentNode.appendChild(div);
		
				})
				.catch(function(error){
					console.log(error)
	 			})
		})
 		
 	})
 	.catch(function(error){
 		console.log(error)
	 });
}


const deleteData=function(name){
ReloadCtrl.deleteimage(name);
location.reload();
}
return{
	init:function(){
		EventFunction();
	}
}
})(reloadController)
app.init();