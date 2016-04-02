function iptoLong(ip) {
  var ipl = 0;
  ip.split('.').forEach(function(octet) {
    ipl <<= 8;
    ipl += parseInt(octet);
  });
  return(ipl >>> 0);
};

function ipfromLong(ipl) {
  return ((ipl >>> 24) + '.' +
      (ipl >> 16 & 255) + '.' +
      (ipl >> 8 & 255) + '.' +
      (ipl & 255) );
};

//随机产生一个中国IP
function getChineseIp(provinceArray){
	var provinceArray=provinceArray||getProvinces(chineseIps);
	if(!(provinceArray instanceof Array)){
		provinceArray=[provinceArray];
	}
	var provinceName=getRandomItem(provinceArray);
	var ipAddress=getProvinceRandomIp(provinceName);
	return ipAddress;
}
 

//随机产生指定省的随机ip
function getProvinceRandomIp(provinceName){
	var ipAddress=null;
	if(chineseIps.hasOwnProperty(provinceName)){
		provinceIps=chineseIps[provinceName];
	    var item=getRandomItem(provinceIps);
		ipAddress=getRandomIp(item.min,item.max);
	} 
	return ipAddress;
}

//随机返回minIp到maxIp之间的ip，包括minIp和maxIp
function getRandomIp(minIp, maxIp){
	var min=iptoLong(minIp);
	var max=iptoLong(maxIp);
	var randomNum=getRandomNum(min,max+1);
	return ipfromLong(randomNum);
}

//获取中国各省市名称
function getProvinces(chineseIps){
	var provinces=[];
	for(var province in chineseIps){
		provinces.push(province);
    }
    return provinces;
}

//随机产生指定列表中的元素
function getRandomItem(list){
   var index=getRandomNum(0,list.length);
   return list[index]; 
}


//随机返回min到max之间的整数，但不包括max
function getRandomNum(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
