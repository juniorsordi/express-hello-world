using System.Collections;
using UnityEngine;
using UnityEngine.UI;

public class EnemyHealth : MonoBehaviour
{
    public float hitPoints = 100f;
    public float maxPoint;
    public Image enemyHealthBar;

    bool isDead = false;

    public bool IsDead() {
        return isDead;
    }

    void Start()
    {
        maxPoint = hitPoints;
    }

    void Update()
    {
        enemyHealthBar.fillAmount = Mathf.Clamp(hitPoints / maxPoint, 0, 1);
    }

    public void TakeDamage(float damage) {
        BroadcastMessage("OnDamageTaken");
        hitPoints -= damage;

        if(hitPoints <= 0) {
            Dead();
        }
    }

    private void Dead() {
        if(isDead) return;
        isDead = true;
        GetComponent<Animator>().SetTrigger("dead");
    }
}