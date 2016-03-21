This project was not intended for commerce,
so, no feel free to improve or use parts of it as You like.
This all was created using the free version of Unity.


Some notes about details.


The project is functional and tested as standalone, in editor (of course) and compiled for web-player.




When compiling player version, set commented ( put "//" before command) the line

Engine.StartInfo.WorkingDirectory = ... 

There are 3 such lines in total: in StockfishCall.js, Ch_socket.cs, RybkaCall.js
Connection to exe is realized as system process and there is no such possibility in web browser,
so compiler gives an errow while compiling. Otherwise it just compiles and runs ok.





Maybe it is possible to compact the project, have not tried hard.
But the beauty of this all partly is because internally it is very interconnected and integrated,
so it will be hard to separate parts without any lag after.
This is the reason why Unity has not such compact (as save button).

