import http from 'http'

import https from 'https'

export class OpenCORS{

	public constructor({port}:{port:number}){
	
		const serverport:string|number = port || process.env.PORT || 8080
	
		const server = http.createServer(async(req,res)=>{

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
			
			let body = 	'OpenCors\n'+
						'OpenCORS is a simple NodeJS based CORS Proxy\n'+
						'https://github.com/nuzulul/opencors\n\n'+
						'Usage :\n'+req.headers.host+'/?url=\n\n'+
						'Agent:\n'+req.headers['user-agent'] ?? "Unknown"
			
			let requrl = req.url as string
			
			requrl = requrl.startsWith('/')?'http://'+req.headers.host as string+req.url:req.url as string
			
			const targeturl = (new URL(requrl)).searchParams.get("url")
			
			if(isvalidurl(targeturl as string)){
			
				const rawdata = await get_page(targeturl as string)
				
				body = rawdata
				
			}else if(targeturl != null){
			
				body = JSON.stringify({status:'error',msg:'Invalid target url',targeturl})
				
			}
						
			res.statusCode = 200
			
			res.setHeader('Content-Type','text/plain')
			
			res.setHeader('Access-Control-Allow-Origin','*')
			
			res.end(body)
		})
		
		server.listen(serverport,()=>{
		
			console.log(`Server running at ${serverport}`)
			
		})
	}
	
}
