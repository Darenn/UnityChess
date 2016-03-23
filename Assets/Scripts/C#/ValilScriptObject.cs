using UnityEngine;
using Valil.Chess.Model;
using Valil.Chess.Engine;

/**
 * Make link between the C# chess engine, et the JS game controller script
 */
public class ValilScriptObject : MonoBehaviour {

	public GameObject gameController;

	private string Request="";
	private string Answer="";
	private int Deep=3;
	
	private ChessEngine Engine1 = new ChessEngine(true);

	void Start() {
		gameController = (GameObject.Find ("GameController"));
	}

	/**
	 * Store the a request for the engine
	 */
	public void JSRequest(string req_string) {
		Request = req_string;
		Answer = ""; // delete the old answer
	}

    /**
     * Change the deep
     */
	public void JSSetDeep(string set_deep) {
		Deep=System.Convert.ToInt32(set_deep);
	}				

	/**
	 * At each update, if there is a request, the engine answer is given to game controller
	 */ 
	void Update () {
		if(Request.Length > 0)
		{
			string answ = "";
			Answer = Engine1.GetNextMove(Request, null, Deep);
			Request = "";
			if(Answer.Length > 0) 
				answ = Answer.Substring(0,2) + "-" + Answer.Substring(2,2);
			if(Answer.Length > 4) 
				answ += "=" + (Answer.Substring(4,1)).ToUpper();			
			gameController.SendMessage("EngineAnswer",answ);
		}
	}	
}
