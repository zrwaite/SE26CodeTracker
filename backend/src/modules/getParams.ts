const getBodyParams = async (req:any, params:string[]) =>{
	//Create the post request
	let success = true;
	let undefinedParams: string[] = [];
	let definedParams: any[] = [];
	params.forEach((param) => {
		if (req.body[param]==undefined) {
			success = false;	
			undefinedParams.push(param);
		} else definedParams.push(req.body[param]);
	});
	return {success: success, params: definedParams, errors: undefinedParams};
};
export {getBodyParams}