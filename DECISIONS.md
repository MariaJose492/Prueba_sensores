1. ¿Cómo modelaste la relación entre sensores y zonas y por qué?

La relación entre sensores y zonas la modelé como una relación muchos a muchos, utilizando una tabla intermedia llamada monitorings. Esto se debe a que, por un lado, un sensor puede monitorear varias zonas de la planta y, por otro, una zona puede tener múltiples sensores activos al mismo tiempo.

Además, no era suficiente con usar claves foráneas directas, ya que la relación entre ambas entidades contiene información propia, como la fecha de instalación, el tipo de lectura, el valor umbral y el estado del monitoreo. Por esta razón, la tabla monitorings permite representar correctamente la relación y almacenar atributos específicos de cada asignación.

De igual manera, esta estructura funciona prácticamente como una normalización del modelo, porque separa los datos estáticos (sensores y zonas) de los datos dinámicos (monitorings). Así se evita duplicidad, se garantiza integridad y se facilita la consulta de información.

Finalmente, este diseño también abre la puerta a futuras ampliaciones del sistema, ya que permite manejar de forma más ordenada un historial de monitoreos, la generación de alertas o incluso métricas detalladas por sensor y zona.

2. ¿Qué validación o restricción consideras más importante en tu solución y por qué?

En mi solución, la validación más importante fue la restricción que impide asignar el mismo sensor más de una vez a la misma zona. Esto lo implementé mediante una cláusula UNIQUE(sensor_id, zone_id) en la tabla monitorings, ya que de esta manera se garantiza la integridad de los datos y se evita la duplicidad de registros. Sin esta validación, podrían generarse inconsistencias que mostrarían múltiples monitoreos idénticos para el mismo sensor en la misma zona, lo cual no tendría sentido dentro del sistema.

Además de esta restricción principal, también consideré necesarias otras validaciones que complementan la coherencia del modelo. Por ejemplo, definí CHECK para limitar los tipos de lectura permitidos, establecí estados válidos tanto para sensores como para monitoreos, y aseguré que los valores umbral fueran siempre mayores a cero. A nivel de backend, añadí un manejo de errores descriptivo en la API, de modo que los mensajes sean claros y ayuden a identificar rápidamente la causa de cualquier problema.

En conjunto, todas estas validaciones no solo refuerzan la consistencia de la base de datos, sino que también mejoran la experiencia de uso del sistema, ya que previenen errores comunes y facilitan la administración de la información.

3. ¿Cómo organizaste la estructura de tu backend y por qué elegiste esa organización?

El backend lo organicé siguiendo una arquitectura por capas, ya que esta forma de estructurar el proyecto me permite separar responsabilidades y, al mismo tiempo, mantener el código más claro y fácil de mantener.

En cuanto a la organización, la estructura principal incluye:

- models/, donde definí las entidades con SQLAlchemy.
- schemas/, que se encargan de las validaciones y la serialización de datos con Pydantic.
- routes/, donde están definidos los endpoints de la API.
- services/, que concentran la lógica de negocio y las consultas principales.
- database/, con la configuración de la conexión a PostgreSQL.
- dependencies/, utilizadas para la inyección de dependencias como la sesión de base de datos.

De esta manera, cada carpeta cumple un rol específico y se conecta con las demás de forma ordenada. Gracias a esta organización, el proyecto no solo mantiene el código modular y más limpio, sino que además logra separar la lógica de negocio de la lógica HTTP, lo que facilita tanto las pruebas como el mantenimiento. Al mismo tiempo, permite reutilizar funcionalidades sin necesidad de duplicar código y, finalmente, ofrece la posibilidad de escalar el sistema de manera más sencilla en caso de que crezca.

En particular, la capa de services resultó muy útil, porque allí centralicé las validaciones y las reglas de negocio relacionadas con monitoreos, sensores y zonas. Esto me permitió que los endpoints fueran más ligeros y que la lógica quedara concentrada en un solo lugar, lo cual hace que el backend sea más consistente y fácil de extender en el futuro.

4. Si tuvieras un día adicional para mejorar el proyecto, ¿qué funcionalidad implementarías primero y por qué?

Si tuviera un día adicional, la primera mejora que implementaría sería un sistema de alertas en tiempo real para los sensores que superen el valor umbral configurado. Actualmente el sistema ya muestra visualmente cuando un sensor sobrepasa dicho umbral, pero considero que sería mucho más útil agregar notificaciones automáticas, alertas visuales dinámicas, actualización en tiempo real mediante WebSockets y un historial de alertas generadas. De esta forma, el proyecto aportaría un mayor valor en un contexto industrial, ya que permitiría detectar rápidamente comportamientos anómalos en la planta y reaccionar de manera más eficiente.

Además, aunque no es tan prioritario como el sistema de alertas, también aprovecharía ese tiempo para mejorar el frontend, ya sea optimizando la interfaz, añadiendo componentes más intuitivos o reforzando la experiencia de usuario con un diseño más claro y accesible. Esto complementaría el backend y haría que el sistema fuera más atractivo y fácil de usar.

Por último, considero que otra mejora importante sería incorporar pruebas automatizadas tanto para el backend como para el frontend. Esto garantizaría que las funcionalidades críticas se mantengan estables a medida que el proyecto evoluciona y facilitaría la detección temprana de errores.

En conjunto, estas mejoras no solo fortalecerían la robustez técnica del sistema, sino que también lo acercarían a un escenario más real de monitoreo industrial, con una experiencia de usuario más completa y confiable.