import System.IO;
import System.Diagnostics;
import System.Net;

var Name="Rybka v.2 chess engine linking script";

var Accessible=false;

var ExeConn="";
var ExePath="";
		
var Request_FEN="";
var Answer="";

var EngineStatus=0;			// Status of Rybka engine...

var EngineStN=3;				// Depth to think for Rybka...

var EngineTimeout:float=0;

var pEngine= new Process();
var EngineStarted=false;

// Rybka is supposed for Windows Standalone version, just to improve chess quality...
// Put under an object and call requests to Rybka. 

// Realized as ExeConnector.exe calls.

function Start () 
{
 Accessible=false;					// Rybka just for Windows Editor or Windows Standalone... (no WebPlayer)
 if(((Application.platform.ToString()).IndexOf("Windows")>=0) && ((Application.platform.ToString()).IndexOf("Web")<0))
	{
	var editpath=Application.dataPath;
	if( (Application.platform.ToString()).IndexOf("WindowsEditor")<0 ) editpath = "";
	else editpath = editpath.Substring(0,editpath.LastIndexOf("Assets"))+"standalone\\Windows\\";
 
	ExeConn = editpath + "rybka_engine\\ExeConnector.exe";
			
	Accessible = System.IO.File.Exists(ExeConn);			// if file exists...
	if(Accessible)
		{
		var at=ExeConn.LastIndexOf("\\");
		ExePath=((at<0) ? "" : ExeConn.Substring(0,at+1));
		pEngine=null;
		}
	}
 LetKnow3D();		// Send information about accessibility to the main script...
}
	
function Update () 
{
if(Accessible)
	{
	if((EngineStatus>0) && ((Time.time-EngineTimeout)>60)) { Accessible=false; LetKnow3D(); }	// Timeout or too long...
 	if((EngineStatus==0) && (Request_FEN.length>0))
		{
		if(EngineStarted) EngineStatus=10;
		else EngineStatus=8;
		
		EngineTimeout=Time.time;
		}
	if(EngineStatus==8)
		{		
			pEngine= new Process();			
            pEngine.StartInfo.CreateNoWindow = true;
			pEngine.StartInfo.WorkingDirectory = ExePath;		// !!! just make it as a comment to avoid build-compile error for Web platform !!!
			pEngine.StartInfo.FileName =ExeConn;				// Call RybkaCall.exe and as a parameter give the file name of Rybka engine.
            pEngine.StartInfo.Arguments = "";
			pEngine.StartInfo.UseShellExecute = false;
			pEngine.Start();
			
			if(pEngine==null) { Accessible=false; LetKnow3D();  }
			else { EngineStarted=true; EngineStatus=10; }
		}
	if(EngineStatus==10)
		{
		SendToServer("position fen " +Request_FEN+"\n"+"go depth "+(EngineStN).ToString()+"\n");
		EngineStatus=15; 
		Request_FEN=""; Answer="";
		}
	if(EngineStatus==15)				// read answer- is ok or error...
		{
		ReadFromServer();
		}
	if(EngineStatus==20)				// wait for move-answer
		{
		if(Answer.length>0)
			{
			GetComponent("TextMesh").text=Answer;
			(GameObject.Find("Script2")).SendMessage("EngineAnswer","Rybka: " + Answer);
			}
		EngineStatus=0;
		}
	}
}


function LetKnow3D():void
{
(GameObject.Find("Script2")).SendMessage("RybkaAccess", (Accessible ? "YES" : "NO"));
if(!Accessible) { EngineStatus=-1;	Request_FEN=""; Answer=""; }
}

function SetDeepLevel(strength:String):void	// Calls from outside...
{
EngineStN=3 + (( System.Convert.ToInt32( strength ) - 1 ));		// set seconds to think...
}

function SetRequestFEN(FENs:String):void		// Calls from outside...
{
Request_FEN=FENs;
}

function ReadFromServer():void							// Buffered get from local web... Fast enough. 
	{
		var buffer="";
		var request:HttpWebRequest = WebRequest.Create("http://localhost:5051/IN_BUFFER.txt") as HttpWebRequest;
		if(!(request==null))
		{
		var response:HttpWebResponse = request.GetResponse();
		if(!(response==null))
			{  
			var reader:StreamReader = new StreamReader(response.GetResponseStream()); 
			if(!(reader==null))
				{
				buffer=reader.ReadToEnd(); 
				reader.Close();
				}
			}
	
		if((response==null) || (buffer.IndexOf("[IN-BUFFER-OK]")<0))
			{
			Accessible=false; LetKnow3D();
			}
			
		var sLine="";						//Separate lines...
		for(; buffer.Length>0; )
			{
			var a1=buffer.IndexOf("\n");
			if(a1<0) { sLine=buffer; buffer=""; }
			else { sLine=buffer.Substring(0,a1); buffer=buffer.Substring(a1+1); }
			if( (sLine.Length>0) && (sLine.IndexOf("[IN-BUFFER-OK]")<0))
				{
				ProcessLineIN(sLine); 
				}
			}
		if(!(response==null)) response.Close();
		request.Abort();
		}
	}
function ProcessLineIN(sLine:String):void
{
var at1=sLine.IndexOf("bestmove");
if(at1>=0)
	{
	Answer=sLine.Substring(at1+9);
	at1=Answer.IndexOf(" ");
	if(at1>0) Answer=Answer.Substring(0,at1);
	EngineStatus=20;
	}
}

function SendToServer(tLine:String):void						// Buffered put to local web... all the string goes in one url-type post request...
	{
		var buffer="";
		var request:HttpWebRequest = WebRequest.Create("http://localhost:5051/OUT_BUFFER.txt?OUT_BUFFER="+tLine+"\n") as HttpWebRequest;
		if(!(request==null))
		{
		var response:HttpWebResponse = request.GetResponse();
		if(!(response==null))
			{  
			var reader:StreamReader = new StreamReader(response.GetResponseStream());
			if(!(reader==null))
				{
				buffer=reader.ReadToEnd(); 
				reader.Close();
				}
			}

		if((response==null) || (buffer.IndexOf("[OUT-BUFFER-OK]")<0))
			{
			Accessible=false; LetKnow3D();
			}
			
		if(!(response==null)) response.Close();			
		request.Abort();
		}
	}

// On monobehaviour ends, this is called....
function OnApplicationQuit():void 
{
if(EngineStarted) SendToServer("EXIT_EXE");
}