FicsConn.exe is a console application to call as process from Unitry3D.

Starts as Web server from local socket requests on given port (port.dat file) and starts a telnet session to freechess.org via PUTTY's PLINK.EXE
(redirects stdin/stdout)

That way Unity3D on frames-per-second intervals sends/requests buffers of streams to local socket and gets it all from stable telnet session to fics.
Direct sockets were unstable and connection was lost almost all the time.

For tests:
1.Start FicsConn.exe and get FICS first screen through browser by (REQUEST)

	http://localhost:5050/IN_BUFFER.txt

2.Send Guest login by (DATA SEND)

	http://localhost:5050/OUT_BUFFER.txt?OUT_BUFFER=guest

 and send just empty enter press by
	http://localhost:5050/OUT_BUFFER.txt?OUT_BUFFER=

So, after next REQUEST by

	http://localhost:5050/IN_BUFFER.txt

 You'll see that You are logged in freechess.org & chess game seeks
 on FICS server right in the browser.


Server name (or IP address) is in the file FICS.dat.
