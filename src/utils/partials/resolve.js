export async function resolve(promise){
    const resolved={
        data:null,
        error:null
    }
    try{
        resolved.data=await promise;
    }
    catch(err){
        resolved.error=err;
    }
    return resolved;

}