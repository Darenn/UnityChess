#pragma strict
#pragma downcast

/**
 * Store and give a minimum handle on 
 * scripts game object
 * @see CES = Chess Engine Script
 */
class ScriptManager extends MonoBehaviour
{
	// TODO - public in Editor ?
	private var gameControllerScript : GameObject;   // Script2
	private var valilCES : GameObject; 				 // Script1
	
	private var scriptHashtable : Hashtable;
	
 	/**
 	 * TODO
 	 */
	function Start () {
		
		// Instanciate hashtable
		scriptHashtable = new Hashtable();
		
		// Init
		GetAllGameObject();
	}
	
	/**
	 * TODO
	 */
	function Update () {

	}
	
	/**
	 * Return the specified GameObject
	 *
	 * @param key The key of the wanted gameObject
	 * @return The game object specified by the given key
	 */
	public function GetScript(key : String) : GameObject {
		
		if(!scriptHashtable.ContainsKey(key)) {
			Debug.Log("[ScriptManager] The key doesn't exist in the map");
			return null;
		}
		
		return scriptHashtable[key];
	}
	
	/**
	 * TODO
	 */
	private function GetAllGameObject() : void {
		
		// TODO - Change Script name in Editor
		valilCES = GameObject.Find("ValilCES");
		gameControllerScript = GameObject.Find("GameController");
		
		AddToHashtable("valilCES", valilCES);
		AddToHashtable("gameControllerScript", gameControllerScript);
	}
	
	/**
	 * Add an object to an hashtable with his key
	 *
	 * @param key The string representation of the key
	 * @param object The game object to insert in the map 
	 * @return true if the object is not null, else false
	 */
	private function AddToHashtable(key : String, object : GameObject) : boolean {
		
		if(object == null) {
			Debug.Log("[ScriptManager] Unable to add the script (NULL)");
			return false;
		}
		
		scriptHashtable.Add(key, object);
		return true;
	}
}