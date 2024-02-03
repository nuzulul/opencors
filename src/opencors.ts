import http from 'http'

import https from 'https'

export class OpenCORS{

	public constructor({port,front}:{port?:number,front?:string}){
	
		const serverport:string|number = port || process.env.PORT || 8080
	
		const server = http.createServer(async(req,res)=>{

			res.statusCode = 200
			
			res.setHeader('Content-Type','text/plain')
			
			res.setHeader('Access-Control-Allow-Origin','*')

			function isvalidurl(url:string){
			
				try{
				
				  return !!(new URL(url))
				  
				}catch(e){
				
				  return false
				}
			}

			function get(targeturl:string,resolve:any){
			
					https.get(targeturl, res => {
					
						if((res.statusCode === 301 || res.statusCode === 302)&&(res.headers.location != undefined)){
						
							return get(res.headers.location,resolve)
						
						}
					
						let data:any[] = []
						
						res.on('data', chunk => { data.push(chunk) }) 

						res.on('end', () => {
						
							try{
						
								const raw = Buffer.concat(data).toString()
						   
								resolve(raw)
								
							} catch(err) {
							
								let msg = JSON.stringify({status:'error',msg:err,targeturl})
								
								resolve(msg)
							
							}

						})
					}) 			
			}

			async function get_page(targeturl:string):Promise<string> {

				return new Promise((resolve) => {
				
					get(targeturl,resolve)
					
				})
			}
			
			let body = 	'OpenCors<br>'+
						'OpenCORS is a simple NodeJS based CORS Proxy<br>'+
						'https://github.com/nuzulul/opencors<br><br>'+
						'Usage :<br>'+req.headers.host+'/?url=<br><br>'+
						'Agent:<br>'+(req.headers['user-agent'] ?? "Unknown")+'<br><br>'+
						'Demo:<br>'+
						'Input Url <input type="text" id="input"/><button id="button" onclick="location.href=\'/?url=\'+document.getElementById(\'input\').value">Submit</button>'
			
			if(front != undefined) body = front
			
			let requrl = req.url as string
			
			requrl = requrl.startsWith('/')?'http://'+req.headers.host as string+req.url:req.url as string
			
			const targeturl = (new URL(requrl)).searchParams.get("url")
			
			if(isvalidurl(targeturl as string)){
			
				const rawdata = await get_page(targeturl as string)
				
				body = rawdata
				
			}else if(targeturl != null){
			
				body = JSON.stringify({status:'error',msg:'Invalid target url',targeturl})
				
			}else{
				res.setHeader('Content-Type','text/html')
			}
			
			res.end(body)
		})
		
		server.listen(serverport,()=>{
		
			console.log(`Server running at ${serverport}`)
			
		})
	}
	
}
