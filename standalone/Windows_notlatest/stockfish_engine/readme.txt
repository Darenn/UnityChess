
ExeConnector.exe is a console application to call as process. 

Starts as Web server for local socket requests on given port (port.dat file) 
and starts a EXE (redirects stdin/stdout)

Put the file name in Data//Exe2Start.dat
Command line arguments give in Arguments.dat (better not to do it, because stdin-stdout captured, use method below)


For tests:
1.Start ExeConnector.exe and get STDOUT from exe through browser by (REQUEST)

	http://localhost:5050/IN_BUFFER.txt

2.Send data to STDIN of this EXE by  (DATA SEND)

	http://localhost:5050/OUT_BUFFER.txt?OUT_BUFFER=....string of data here...

3. At the end send command to exit processes and close all by

	http://localhost:5050/OUT_BUFFER.txt?OUT_BUFFER=EXIT_EXE



For implementation in other EXEs above (for example Unity3D calls in C#):

Start processes by :

	using System.Diagnostics;
	using System.Net;

	try
	{
	p=new Process();
	p.StartInfo.WorkingDirectory = Path;
	p.StartInfo.CreateNoWindow = true;
	p.StartInfo.FileName = ExeFileName;
	p.StartInfo.Arguments = "";
	p.StartInfo.UseShellExecute = false;
	p.Start();
	}
	catch(Exception e) {}		//Unable start process...



And read or send to local sockets as http: requests by

	HttpWebRequest request = WebRequest.Create("http://localhost:5050/IN_BUFFER.txt") as HttpWebRequest;
	using (HttpWebResponse response = request.GetResponse() as HttpWebResponse)
		{
 		StreamReader reader = new StreamReader(response.GetResponseStream());
		String buffer=reader.ReadToEnd();
		reader.Close();
		}


The idea for all types of MS Windows .NET type applications is the same.
Start a process silently and interract through http requests.
