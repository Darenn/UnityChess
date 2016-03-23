using UnityEngine;
using System.Collections;

/// <summary>
/// Will do animations and play sounds relative to the action done by the piece.
/// Actions are Prepare, StopPrepare, Run, StopRun, Attack and Die.
/// </summary>
public class ActionController : MonoBehaviour {

	// Audio clips to play
	public AudioClip attackSound;
	public AudioClip runSound;
	public AudioClip dieSound;
	public AudioClip prepareSound;

	// Components
	private AudioSource audioSource;
	private Animator animator;

	void Start() {
		audioSource = gameObject.GetComponent<AudioSource> ();
		animator = gameObject.GetComponent<Animator> ();
	}

	void Prepare() {
		animator.SetBool ("IsPreparing", true);
		audioSource.clip = prepareSound;
		audioSource.Play ();
	}

	void StopPrepare() {
		animator.SetBool ("IsPreparing", false);
		audioSource.Stop ();
	}

	void Run() {
		animator.SetBool ("IsMoving", true);
		audioSource.clip = runSound;
		audioSource.loop = true;
		audioSource.Play ();
	}

	void StopRun() {
		animator.SetBool ("IsMoving", false);
		audioSource.loop = false;
		audioSource.Stop ();
	}

	// Triggers

	void Attack() {
		animator.SetTrigger ("Attack");
		audioSource.clip = attackSound;
		audioSource.Play ();
	}

	void Die() {
		animator.SetTrigger ("Die");
		audioSource.clip = dieSound;
		audioSource.Play ();
	}

	void Update() {

	}
}
