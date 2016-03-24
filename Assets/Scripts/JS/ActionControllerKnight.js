#pragma strict

public class ActionControllerKnight extends ActionController {

	public var jumpSound : AudioClip;
	public var landSound : AudioClip;
	
	private var isJumping : boolean = false;

	function Jump() {
		isJumping = true;
		animator.SetTrigger("Jump");
		audioSource.clip = jumpSound;
		audioSource.Play ();
	}
	
	function Land() {
		isJumping = false;
		animator.SetTrigger("Land");
		audioSource.clip = landSound;
		audioSource.Play ();
	}

}