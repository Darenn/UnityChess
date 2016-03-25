#pragma strict

/**
 * TODO
 */
public class HighlighterController extends MonoBehaviour
{
	public var highlighter : GameObject;

	/**
	 * TODO
	 */
	function Start () {
		// None
	}

	/**
	 * TODO
	 */
	function Update () {

	}

	/**
	 * TODO
	 */
	public function SetHighlighterPosition(position : Vector3) {
		highlighter.GetComponent(Rigidbody).transform.position.x = position.x;
		highlighter.GetComponent(Rigidbody).transform.position.z = position.z;
	}
}
