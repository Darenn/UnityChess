#pragma strict

/**
 * Handle the chessboard highlighting
 */
public class HighlighterController extends MonoBehaviour
{
	public var highlighter : GameObject;

	/**
	 * Initialize the class
	 */
	function Start () {
		// None
	}

	/**
	 * Called once per frame
	 */
	function Update () {
		// None
	}

	/**
	 * Set the position of the highlighter plane on the scene
	 *
	 * @param position The supposed position of the plane (raycast resutlt)
	 * @return void
	 */
	public function SetHighlighterPosition(position : Vector3) : void {
		highlighter.GetComponent(Rigidbody).transform.position.x = position.x;
		highlighter.GetComponent(Rigidbody).transform.position.z = position.z;
	}
}
