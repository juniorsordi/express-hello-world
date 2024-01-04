using UnityEngine;
using UnityEngine.AI;
using UnityEngine.UI;

public class EnemyAI : MonoBehaviour
{
    [SerializeField] Transform target;
    [SerializeField] float chaseRange = 5f;
    [SerializeField] float turnSpeed = 5f;
    [SerializeField] float damage = 40f;

    GameObject objective;
    NavMeshAgent navMeshAgent;
    EnemyHealth health;
    float distanceToTarget = Mathf.Infinity;
    bool isProvoked = false;


    void Start()
    {
        navMeshAgent = GetComponent<navMeshAgent>();
        objective = GameObject.FindWithTag("Player");
        health = GetComponent<EnemyHealth>();
    }

    void Update()
    {
        distanceToTarget = Vector3.Distance(target.position, transform.position);

        if(health.IsDead()) {
            enabled = false;
            navMeshAgent.enabled = false;
        }

        if(isProvoked) {
            EngageTarget();
        } else if(distanceToTarget <= chaseRange) {
            isProvoked = true;
        }
    }

    void OnDrawGizmosSelected()
    {
        Gizmos.color = new Color(1,0,0,1);
        Gizmos.DrawWireSphere(transform.position, chaseRange);
    }

    private void EngageTarget() {
        FaceTarget();
        if(distanceToTarget >= navMeshAgent.stoppingDistance) {
            ChaseTarget();
        } else if(distanceToTarget <= navMeshAgent.stoppingDistance) {
            AttackTarget();
        }
    }

    private void ChaseTarget() {
        GetComponent<Animator>().SetBool("attack", false);
        GetComponent<Animator>().SetTrigger("move");
        navMeshAgent.SetDestination(target.position);
    }

    private void FaceTarget() {
        Vector3 direction = (target.position - transform.position).normalized;
        Quaternion lookRotation = Quaternion.LookRotation(new Vector3(direction.x, 0, direction.z));
        transform.rotation = Quaternion.Slerp(transform.rotation, lookRotation, Time.deltaTime * turnSpeed);
    }

    private void AttackTarget() {
        GetComponent<Animator>().SetBool("attack", true);
    }

    public void OnDamageTaken() {
        isProvoked = true;
    }

    public void AttackHitEvent() {
        if(objective == null) return;
        objective.TakeDamage(damage);
        Debug.Log("bang bang");
    }

}