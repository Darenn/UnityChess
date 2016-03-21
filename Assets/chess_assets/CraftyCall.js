import System.IO;
import System.Diagnostics;
//import System.DateTime;

var Name="Crafty chess engine linking script";

var CraftyAccessible=false;

var CraftyFile="";
var CraftyPath="";
var CraftyExe ="";
		
var Request_FEN="";
var Answer="";

var CraftyStatus=0;			// Status of Crafty engine...

var CraftyStN=3;				// Minimum seconds to think for Crafty...

var CraftyTimeout:float=0;

var pCrafty= new Process();

// Crafty is supposed for Windows Standalone version, just to improve chess quality...
// Put under an object and call requests to Crafty. The only thing,  Crafty is called as a new exe-instance on every move.
// The other solution-pondering DOS application isn't better as it uses CPU too much.
// It's ok for nowadays hardware. Can use Crafty.ini to set better search parameters (more hash memory, opening tables etc.

// Realized as CraftyCall.exe calls.  Could be component dll, anyway just made exe.
// By the way, self-built components are disabled in free Unity's version's standalone (as I know).
// Can't call Crafty directly because of Unity's security - a lot of system functions are disabled.
// In this case, stdin-input of Crafty can't be re-addressed.

function Start () 
{
 CraftyAccessible=false;					// Crafty just for Windows Editor or Windows Standalone... (no WebPlayer)
 if(((Application.platform.ToString()).IndexOf("Windows")>=0) && ((Application.platform.ToString()).IndexOf("Web")<0))
	{
	var editpath=Application.dataPath;
	if( (Application.platform.ToString()).IndexOf("WindowsEditor")<0 ) editpath = "";
	else editpath = editpath.Substring(0,editpath.LastIndexOf("Assets"))+"standalone\\Windows\\";
 
	CraftyFile = editpath + "crafty_engine\\crafty-22.0-win32.exe";
			
	CraftyAccessible = System.IO.File.Exists(CraftyFile);			// if file exists...
	if(CraftyAccessible)
		{
		var at=CraftyFile.LastIndexOf("\\");
		CraftyPath=((at<0) ? "" : CraftyFile.Substring(0,at+1));
		CraftyExe =((CraftyPath.length<CraftyFile.length) ? CraftyFile.Substring(CraftyPath.length) : CraftyFile);
		pCrafty=null;
		}
	}
 LetNow3D();		// Send information about accessibility to the main script...
}
	
function Update () 
{
if(CraftyAccessible)
	{
	if((CraftyStatus>0) && ((Time.time-CraftyTimeout)>60)) { CraftyAccessible=false; LetNow3D(); }	// Timeout or too long...
 	if((CraftyStatus==0) && (Request_FEN.length>0))
		{
		if(System.IO.File.Exists(CraftyPath + "return0.txt")) System.IO.File.Delete(CraftyPath + "return0.txt");
		if(System.IO.File.Exists(CraftyPath + "return1.txt")) System.IO.File.Delete(CraftyPath + "return1.txt");
		if(System.IO.File.Exists(CraftyPath + "return2.txt")) System.IO.File.Delete(CraftyPath + "return2.txt");
		if(System.IO.File.Exists(CraftyPath + "input.txt")) System.IO.File.Delete(CraftyPath + "input.txt");
		CraftyStatus=8;
		CraftyTimeout=Time.time;
		}
	if(CraftyStatus==8)
		{		
		System.IO.File.Copy(CraftyPath + "Crafty.ini",CraftyPath + "input.txt",true);	//overwrite all configuration data + add new...

		var Crafty_stdin = new StreamWriter(CraftyPath + "input.txt", true);
		if(Crafty_stdin==null) { CraftyAccessible=false; LetNow3D(); }
		else
			{
			Crafty_stdin.Write("st  "+CraftyStN.ToString()+"\n");
			Crafty_stdin.Write("setboard " +Request_FEN+"\n");
			Crafty_stdin.Write("go\n");
			Crafty_stdin.Close();
			
			pCrafty= new Process();			
            pCrafty.StartInfo.CreateNoWindow = true;
			pCrafty.StartInfo.FileName =CraftyPath + "CraftyCall.exe";				// Call CraftyCall.exe and as a parameter give the file name of Crafty engine.
            pCrafty.StartInfo.Arguments = CraftyExe;
			pCrafty.StartInfo.UseShellExecute = false;
			pCrafty.Start();
			
			if(pCrafty==null) { CraftyAccessible=false; LetNow3D();  }
			else CraftyStatus=15; 
			}
		Request_FEN=""; Answer="";
		}
	if(CraftyStatus==15)				// read answer- is ok or error...
		{
		if( System.IO.File.Exists(CraftyPath + "return0.txt")) { CraftyAccessible=false; LetNow3D(); }
		else if( System.IO.File.Exists(CraftyPath + "return1.txt")) CraftyStatus=22;
		}
	if(CraftyStatus==22)				// wait for move-answer
		{
		if( System.IO.File.Exists(CraftyPath + "return2.txt")) CraftyStatus=27;
		}
	if(CraftyStatus==27)				// read move...
		{
			var game_Result = new StreamReader(CraftyPath + "game.001");
			if(game_Result==null) { CraftyAccessible=false; LetNow3D(); }
			else
				{
				for(var readstr="";;)
					{
					readstr=game_Result.ReadLine();
					if((readstr==null) || (readstr.length==0)) break;
					Answer=readstr;				// the last record is a move from Crafty...
					}
	
				game_Result.Close();
				Answer=Answer.Replace(" ","");
				
				if(Answer.length>0)
					{
					GetComponent("TextMesh").text=Answer;
					(GameObject.Find("Script2")).SendMessage("EngineAnswer","Crafty: " + Answer);
					}
				}
			CraftyStatus=0;
		}
	}
else CraftyStatus=0;
if((CraftyStatus==0) && (!(pCrafty==null)))		// If process left in memory...
	{
// just do nothing... Unity can't kill this process...
//	if(!pCrafty.HasExited) pCrafty.Kill();
	pCrafty=null;
	}
}

function LetNow3D():void
{
(GameObject.Find("Script2")).SendMessage("CraftyAccess", (CraftyAccessible ? "YES" : "NO"));
}

function SetDeepLevel(strength:String):void	// Calls from outside...
{
CraftyStN=3 + (( System.Convert.ToInt32( strength ) - 1 ));		// set seconds to think...
}

function SetRequestFEN(FENs:String):void		// Calls from outside...
{
Request_FEN=FENs;
}