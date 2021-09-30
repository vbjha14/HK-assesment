declare global {  
 interface Number {  
  thousandsSeperator(): String;  
 }  
}  
Number.prototype.thousandsSeperator = function(): string {  
 return Number(this).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');  
}  

export {}; 

//import '../../../shared/extension-method/sort-property-name-extension-method';