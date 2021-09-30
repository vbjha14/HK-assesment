declare global {  
    interface Array<T> {  
     sortByPropAsc(propertyName:string): Array<T>;  
     sortByPropDesc(propertyName:string): Array<T>;  
     sortBy(sortOrder:number[], key:string): Array<T>;  
    }  
   } 

   Array.prototype.sortByPropAsc = function(propertyName){
    return this.sort((a,b) =>  a[propertyName] < b[propertyName] ? -1 : a[propertyName] > b[propertyName] ? 1 : 0 );
    }

   Array.prototype.sortByPropDesc = function(propertyName){
    return this.sort((a,b) =>  a[propertyName] > b[propertyName] ? -1 : a[propertyName] < b[propertyName] ? 1 : 0 );
    }
    
   Array.prototype.sortBy = function(sortOrder, key){
    return this.sort( (a, b) => {
        return sortOrder.indexOf(a[key]) - sortOrder.indexOf(b[key]);
      });
      
    }

export{}

//import '../../../shared/extension-method/sort-property-name-extension-method';
// this.customerAccountTemps = response.sort((a,b) =>  a.customerName < b.customerName ? -1 : a.customerName > b.customerName ? 1 : 0 );
//this.customerAccountTemps = response.sort((a,b) =>  a.customerName.localeCompare(b.customerName) );
// this.customerAccountTemps = response.sort((a,b) =>  a.customerId < b.customerId ? -1 : a.customerId > b.customerId ? 1 : 0 );
//this.customerAccountTemps = response.sort((a,b) =>  a.customerName.localeCompare(b.customerName) || a.id - b.id );

// this.customerAccountTemps = response.sort((a,b) => {
      //   let a_config : IRetailerConfiguration = this.retailers.find(r => r.id == a.customerId);
      //   let b_config : IRetailerConfiguration = this.retailers.find(r => r.id == b.customerId);
        
      //   if(a_config.code < b_config.code) 
      //   return -1 
      //   if(a_config.code < b_config.code) 
      //   return 1; 

      //   return 0;
      // });